export interface GuestRSVP {
    name: string;
    dietaryRequirements?: string;
    children?: number[];
    isAttending: boolean;
    willDance?: string;
    email?: string;
    timestamp: firebase.firestore.FieldValue;
}
