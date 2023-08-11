import {
    CreateDownloadButton, CreateJSONUploadButton
} from './devUIBuilders.js'
import { BlankQOPUserData } from '../UserDataMode/initQOPUD.js';
import { CreateWoodshedModeButton } from '../WoodshedMode/initQOP.js';

const QOPUserData = BlankQOPUserData();

CreateDownloadButton(QOPUserData);
CreateJSONUploadButton(QOPUserData);
CreateWoodshedModeButton(QOPUserData);
