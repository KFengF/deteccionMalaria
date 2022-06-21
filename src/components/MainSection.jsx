import { Box, Button, TextField, Typography } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  ref as dbRef,
  set,
  getDatabase,
  increment,
  update,
  child,
  get,
  push,
} from "firebase/database";
import { storage } from "../firebase";
import ShortUniqueId from "short-unique-id";

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = "eba0cb41eb6144b1a2a03ef993445340";
const APP_ID = "3aa062aad0364432813d5ba564850ac8";
const MODEL_ID = "malaria";
const MODEL_VERSION_ID = "7486b97532984f46932e2a2d79f3a923";
const USER_ID = "kevinfeng";
const db = getDatabase();

const MainSection = (props) => {
  const [images, set_images] = useState([]);
  const [loading, set_loading] = useState(false);
  const [inputs, set_inputs] = useState({});

  useEffect(() => {
    if (!images.length) return;

    set_loading(true);
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const promises = images.map((file) => {
      const uid = new ShortUniqueId({ length: 8 })();
      const pointedRef = storageRef(storage, `${month}-${day}-${year}/${uid}`);

      return uploadBytes(pointedRef, file).then((snapshot) =>
        getDownloadURL(snapshot.ref)
      );
    });
    Promise.all(promises)
      .then((URLs) => {
        const raw = JSON.stringify({
          user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
          },
          inputs: URLs.map((URL) => ({
            data: { image: { url: URL } },
          })),
        });

        const requestOptions = {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Key " + PAT,
          },
          body: raw,
        };

        return fetch(
          "https://api.clarifai.com/v2/models/" +
            MODEL_ID +
            "/versions/" +
            MODEL_VERSION_ID +
            "/outputs",
          requestOptions
        );
      })
      .then((response) => response.json())
      .then((result) => {
        const getUID = new ShortUniqueId({ length: 8 });
        const results = [];
        const now = Date.now();
        const counterUpdates = {};
        let hCounter = 0;
        let iCounter = 0;
        let tCounter = 0;

        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          let probability = result.outputs[i].data.concepts[0].value;
          let status = "infectada";
          const uid = getUID();

          set(dbRef(db, "results/" + uid), {
            infectedProb: probability,
            date: now,
            filename: image.name,
          });

          if (result.outputs[i].data.concepts[0].value < 0.5) {
            probability = 1 - probability;
            status = "sana";
            hCounter++;
          } else {
            iCounter++;
          }
          tCounter++;

          results.push({
            filename: image.name,
            probability,
            status,
            uid,
          });
        }

        const refToUse = dbRef(getDatabase());
        get(child(refToUse, `tests/${inputs.ID}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const newPostKey = push(
                child(refToUse, `/tests/${inputs.ID}/results/`)
              );
              console.log(results);
              results.forEach((result) => set(newPostKey, result.uid));
            } else {
              set(dbRef(db, "tests/" + inputs.ID), {
                results: results.map((result) => result.uid),
                date: now,
                name: inputs.name,
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });

        counterUpdates["counter/infected"] = increment(hCounter);
        counterUpdates["counter/total"] = increment(iCounter);
        counterUpdates["counter/healthy"] = increment(tCounter);

        update(dbRef(db), counterUpdates);

        props.set_results(results);
        props.setMessage({
          status: "success",
          body: "Se obtuvieron los resultados.",
        });
      })
      .catch((err) => {
        console.error(err);
        props.setMessage({
          status: "error",
          body: err.message,
        });
      })
      .finally(() => set_loading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const inputChange = (e) => {
    set_inputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    if (e.target.files.length > 6) {
      return props.setMessage({
        status: "error",
        body: "Error: No se puede subir más de 6 imágenes a la vez.",
      });
    }
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      if (file.size > 30720) {
        return props.setMessage({
          status: "error",
          body: "Error: No se puede imágenes que pesen más de 30Kb.",
        });
      }
    }
    set_images(Array.from(e.target.files));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="75vh"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        display="block"
        maxWidth="600px"
        variant="h1"
        color="#444"
        textAlign="center"
        fontSize="4.5rem"
      >
        Bienvenido, detecte
      </Typography>
      <Box display="flex" marginBottom="12px" className="over-particles">
        <img src="/u1.png" alt="célula sana" className="image first" />
        <img src="/p1.png" alt="célula infectada" className="image" />
        <img src="/u2.png" alt="célula sana" className="image last" />
      </Box>
      <TextField
        name="name"
        label="Nombre"
        variant="standard"
        color="secondary"
        style={{ margin: "8px 0" }}
        onChange={inputChange}
      />
      <TextField
        name="ID"
        label="Cédula de Identidad"
        variant="standard"
        color="secondary"
        style={{ margin: "8px 0 16px" }}
        onChange={inputChange}
      />
      <label htmlFor="images-input">
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="images-input"
          type="file"
          multiple
          onChange={handleSubmit}
        />
        <Button
          size="large"
          variant="contained"
          startIcon={<PhotoCameraIcon />}
          disabled={loading}
          component="span"
        >
          {loading ? (
            <div className="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            "Subir"
          )}
        </Button>
      </label>
    </Box>
  );
};

export default MainSection;
