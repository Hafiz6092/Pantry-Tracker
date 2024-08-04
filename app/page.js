'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { collection, deleteDoc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase.js"; // Import correctly from firebase.js
import { Box, Typography } from '@mui/material';
import { async } from "@firebase/util";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];

    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    console.log(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      
        await setDoc(docRef, {quantity: quantity + 1})
      
    }else{
      await setDoc(docRef, {quantity: 1})
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if(quantity === 1){
        await deleteDoc(docRef)
      }else{
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }
    await updateInventory()
  }


  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)


  return (
    <Box width="100vw" height = "100vh" display = "flex" justifyContent= "center" >
      <Typography variant="h1" > Inventory Management </Typography>
      
    </Box>
  );
}
