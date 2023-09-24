
// export const [BannerImage,setBannerImage] = useState("");


// export const fetchBanner = async () => {
//     try {
//       const docRef = doc(db, "Banner", "Banner");
//       const docSnap = await getDoc(docRef);
      
//       if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data()["url"]);
//         setBannerImage(docSnap.data()["url"]);
//       } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//       }

//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };