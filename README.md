# projectReactNativ

Petit Projet de la semaine

Objectifs
Créer une application React Native avec du routing qui devra posséder les pages suivantes :
Page d'accueil avec les boutons principaux pour prendre une photo ou consulter les photos existantes
Page permettant de consulter les photos sous forme de liste
Page permettant de consulter les photos dans une carte interactive

Structure des données probable : 
{
  id:number, 
  geo: {x:number,y:number}, 
  picture: string, 
  description: string, 
  author: string, 
  postedAt: date sous forme de string
}
 
Outils
Vous pouvez utiliser toutes les library et modules expo/react-native que vous souhaitez,
 sachant que vous aurez forcément besoin du module de géolocalisation, du module camera/
prise de photo, d'un module de cartographie

API Backend
L'API est disponible à l'adresse https://bunny-relaxing-quickly.ngrok-free.app/ 
(en tout cas tant que mon PC est allumé et sert le serveur en question)
Les routes disponibles sont :
GET https://bunny-relaxing-quickly.ngrok-free.app/api/picture
GET https://bunny-relaxing-quickly.ngrok-free.app/api/picture/:id 
POST https://bunny-relaxing-quickly.ngrok-free.app/api/picture
 
Le post attend obligatoirement uniquement le geo:{x:number,y:number} et la picture:string 
(en base64) mais les autres propriétés peuvent être fournies également

/*---Command List---/*
npx create-expo-app --template blank     création du projet
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar    Installer le routeur
doc: https://docs.expo.dev/versions/latest/sdk/imagepicker/
Installation in managed Expo projects          !!
npx expo install expo-image-picker    récuperer les photos et en faire
npx expo install expo-location        récupérer géoloc
npx expo install react-native-maps    MapInteractive
 
