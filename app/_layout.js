import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

/**
 * Le fichier _layout sera chargé automatiquement par le expo router pour toutes les pages.
 * Il permet de définir une structure commune à chaque page, le Slot représentant le 
 * contenu de la page sur laquelle on se trouve. Ici on s'en sert pour faire que toutes
 * les pages puissent avoir des Gesture
 */
export default function Layout() {
    return (
        <GestureHandlerRootView>
            <Slot />
        </GestureHandlerRootView>
    );
}