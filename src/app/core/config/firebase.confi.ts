import { environment } from "src/environments/environment.prod";
import {initializeApp} from '@angular/fire/app';

export const app = initializeApp(environment.firebaseConfig);