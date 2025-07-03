import { db } from "@/firebaseConfig";
import { addDoc, collection, doc, DocumentData, Firestore, getDoc, getDocs, orderBy, query, QueryDocumentSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/components/AuthProvider";

type Post = {
    caption: string;
    image: string;
    createdAt: Date;
    createdBy: string;
}



const posts = collection(db, "posts");
const users = collection(db, "users");

async function addPost(post: Post) {
    await addDoc(posts, post);
}

async function addUser(userID: string) {
    await setDoc(doc(db, "users", userID), {
        favorites: []
    })
}

async function addFavorite(userID: string, imageName: string, imageCaption: string, imageCreatedBy: string) {
    const imageRef = {
        caption: imageCaption,
        image: imageName,
        createdBy: imageCreatedBy
    }
    const userRef = doc(db, "users", userID);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot && userSnapshot.exists()) {
        const userFavs = userSnapshot.data().favorites;
        userFavs.push(imageRef);
        await updateDoc(userRef, {
            favorites: userFavs
        })
    } else {
        await addUser(userID);
        const newUser = doc(db, "users", userID);
        const newUserSnapshot = await getDoc(newUser);
        if (newUserSnapshot && newUserSnapshot.exists()) {
            const newUserFavs = await newUserSnapshot.data().favorites;
            newUserFavs.push(imageRef);
            await updateDoc(newUser, {
                favorites: newUserFavs
            })
        }
    }

}

async function getHome() {
    const res: Array<Post> = [];
    const q = query(posts, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const docData = doc.data();
        const docCaption = docData.caption;
        const docImage = docData.image;
        const docCreatedAt = docData.createdAt;
        const docCreatedBy = docData.createdBy;
        res.push({ caption: docCaption, image: docImage, createdAt: docCreatedAt, createdBy: docCreatedBy });
    });
    return res;
}

async function getFavorites(userID: string) {
    const res: Array<Post> = [];
    const userRef = doc(db, "users", userID);
    const snapshot = await getDoc(userRef);
    if (snapshot && snapshot.exists()) {
        for (const doc of snapshot.data().favorites) {
            res.push(doc);
        }
        return res;
    } else {
        return [];
    }
}


export default {
    addPost, getHome, addFavorite, getFavorites
}