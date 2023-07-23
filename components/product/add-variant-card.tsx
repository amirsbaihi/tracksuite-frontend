"use client"
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from "uuid";
import TextField from '@mui/material/TextField';
import {
  Dropzone, ExtFile, FileMosaic,
  FullScreen,
  ImagePreview
} from "@files-ui/react";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useSession } from 'next-auth/react';
import { Variant } from '@/types/product';


export default function AddVariantCard({ onVariantsSubmitted, formSubmitted }:{ onVariantsSubmitted:Function, formSubmitted:boolean }) {
  const [variants, setVariants] = useState({} as {[index:string]:Variant})

  useEffect(() => {
    if (formSubmitted) {
      onVariantsSubmitted(variants)
    }
  }, [formSubmitted, variants])


  const [closedList, setClosedList] = useState([] as string[])
  const onCloseBtnClick = (key:string) => {
    setClosedList([key])

  }
  const firstKey = uuid()
  const [idList, setIdList] = useState({ list: [firstKey] });
  const [inputList, setInputList] = useState({ [firstKey]: <AddVariantForm variants={variants} setVariants={setVariants} closeCallback={() => onCloseBtnClick(firstKey)} key={firstKey} keyValue={firstKey} /> })


  useEffect(() => {
    const condition = idList.list.length > 1
    setIdList({ list: idList.list.filter((id) => !condition || !closedList.includes(id)) }
    )
  }, [closedList])


  const onAddBtnClick = useCallback(() => {
    const key = uuid()
    setInputList({ ...inputList, [key]: <AddVariantForm variants={variants} setVariants={setVariants} closeCallback={() => onCloseBtnClick(key)} key={key} keyValue={key} /> })
    setIdList({ list: [...idList.list, key] })

  }, [inputList, idList, onCloseBtnClick])

  return (
    <Box sx={{ margin: 1 }}>
      <Typography variant="h4" gutterBottom>Aggiungi le varianti</Typography>
      {idList.list.map((id) => inputList[id])}
      <Card sx={{ width: "100%", height: 300, display: 'flex', alignContent: 'center', justifyContent: 'center', margin: "auto" }} onClick={onAddBtnClick}>
        <CardActionArea ><Box sx={{ justifyContent: 'center', display: 'flex' }}>
          <CardContent >

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </CardContent></Box>
        </CardActionArea>
      </Card></Box>
  );
}

function AddVariantForm({ closeCallback, keyValue, variants, setVariants }:{ closeCallback:Function, keyValue:string, variants: {[index:string]:Variant}, setVariants:Function }) {
  const [extFiles, setExtFiles] = React.useState([] as ExtFile[]);
  const [imageSrc, setImageSrc] = React.useState("" as string|undefined);
  const { data: session, status } = useSession()

  const updateFiles = (incommingFiles:ExtFile[]) => {
    console.log("incomming files", incommingFiles);
    setExtFiles(incommingFiles);
  };
  const onDelete = (id:string | number | undefined) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource:string|undefined) => {
    setImageSrc(imageSource);
  };

  const handleStart = (filesToUpload:ExtFile[]) => {
    console.log("start upload", filesToUpload);
  };
  const handleFinish = (uploadedFiles:ExtFile[]) => {
    setVariants(modifyVariant(uploadedFiles.map((f) => f.serverResponse?.payload.url), variants, keyValue, "media"))
  };
  const handleAbort = (id:string | number | undefined) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: "aborted" };
        } else return { ...ef };
      })
    );
  };
  const handleCancel = (id:string | number | undefined) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1 },
        boxShadow: 1,
        borderRadius: 2,
        border: '1px solid',
        padding: 3,
        my: 2
      }}
      noValidate
      autoComplete="off"

    >
      <IconButton  onClick={closeCallback as React.MouseEventHandler<HTMLButtonElement>}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

      </IconButton>
      <div>

        <TextField
          id="option1Value"
          label="Tipo variante 1"
          onChange={({ target }) => setVariants(modifyVariant(target.value, variants, keyValue, "optionValues", 0))}
        />
        <TextField
          id="option2Value"
          label="Tipo variante 2"
          onChange={({ target }) => setVariants(modifyVariant(target.value, variants, keyValue, "optionValues", 1))}
        />
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="price">Prezzo</InputLabel>
          <OutlinedInput
            required
            id="price"
            endAdornment={<InputAdornment position="end">€</InputAdornment>}
            label="Prezzo"
            onChange={({ target }) => setVariants(modifyVariant(target.value, variants, keyValue, "price"))}
          />
        </FormControl>
        <TextField
          required
          id="quantity"
          label="Quantità"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={({ target }) => setVariants(modifyVariant(target.value, variants, keyValue, "quantity"))}
        />
        <TextField
          id="barcode"
          label="Codice a barre"
          onChange={({ target }) => setVariants(modifyVariant(target.value, variants, keyValue, "barcode"))}
        />

        <Dropzone
          onChange={updateFiles}
          minHeight="195px"
          value={extFiles}
          accept="image/*"
          maxFiles={10}
          maxFileSize={20 * 1024 * 1024}
          label="Trascina qui i file o clicca per sfogliare"
          uploadConfig={{
            // autoUpload: true
            url: "/backend/upload/image",
            cleanOnUpload: true,
            headers: {
              Authorization:
                "Bearer " + session?.user.access_token,
            }
          }}
          onUploadStart={handleStart}
          onUploadFinish={handleFinish}
          actionButtons={{
            position: "after",
            abortButton: {},
            deleteButton: {},
            uploadButton: {}
          }}
        >
          {extFiles.map((file) => (
            <FileMosaic
              {...file}
              key={file.id}
              onDelete={onDelete}
              onSee={handleSee}
              onAbort={handleAbort}
              onCancel={handleCancel}
              resultOnTooltip
              alwaysActive
              preview
              info
            />
          ))}
        </Dropzone>
        <FullScreen
          open={imageSrc !== undefined}
          onClose={() => setImageSrc(undefined)}
        >
          <ImagePreview src={imageSrc} />
        </FullScreen>

      </div>
    </Box>
  );
}

function modifyVariant(newValue:string | string[] | number, variants :{[index:string]:Variant}, id:string, key:keyof Variant, index?:number) {

  let variant = variants[id]
  if (index && typeof newValue=="string") {
    if (!variant)
      variants[id] = {} as Variant
    let index = parseInt(key.replace("optionValue", "")) - 1
    variants[id].optionValues = variants[id].optionValues || []
    variants[id].optionValues[index] = newValue
    return variants
  }
  if (key.localeCompare("price") == 0 && typeof newValue=="string")
    newValue = parseFloat(newValue)
  if (key.localeCompare("quantity") == 0 && typeof newValue=="string")
    newValue = parseInt(newValue)
    
  variants[id] = {
    ...variant,
    [key]: newValue
  } as unknown as Variant
  return variants
}