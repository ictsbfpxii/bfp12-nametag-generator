export interface Point {
  x: number;
  y: number;
}

export interface FormProps {}

export interface PreviewProps {}

export interface NametagInfo {
  accountNumber: string;
  rank: string;
  firstName: string;
  lastName: string;
  middleInitial: string;
  nickname: string;
  office: string;
  sectionDivision: string;
  stationProvinceAddress: string;
  photo: string | null;
}

export interface AlertMessage {
  title: string;
  message: string;
}

export interface State extends NametagInfo {
  selectedPhoto: File | null;
  preview: string | null;
  isEditingPhoto: boolean;
  savedNametag: NametagInfo | null;
  isSaving: boolean;
  hasSaved: boolean;
  hasSubmitted: boolean;
  isProcessing: boolean;
  isDownloading: boolean;
  isBackgroundRemoved: boolean;
  openAlert: boolean;
  alertMessage: AlertMessage | null;
}

export type Action =
  | { type: "SET_SELECTED_PHOTO"; payload: File }
  | { type: "REMOVE_SELECTED_PHOTO" }
  | { type: "SET_PHOTO_PREVIEW"; payload: string | null }
  | { type: "REMOVE_PHOTO_PREVIEW" }
  | { type: "SET_ACCOUNT_NUMBER"; payload: string }
  | { type: "SET_RANK"; payload: string }
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string }
  | { type: "SET_MIDDLE_INITIAL"; payload: string }
  | { type: "SET_NICKNAME"; payload: string }
  | { type: "SET_OFFICE"; payload: string }
  | { type: "SET_SECTION_OR_DIVISION"; payload: string }
  | { type: "SET_STATION_OR_PROVINCE_ADDRESS"; payload: string }
  | { type: "SET_PHOTO"; payload: string | null }
  | { type: "CLEAR_FORM" }
  | { type: "EDIT_PHOTO" }
  | { type: "TURN_OFF_EDIT_PHOTO" }
  | { type: "SAVE_NAMETAG"; payload: NametagInfo }
  | { type: "SAVING_NAMETAG" }
  | { type: "NOT_SAVING_NAMETAG" }
  | { type: "HAS_SAVED_NAMETAG" }
  | { type: "TURN_OFF_HAS_SAVED_NAMETAG" }
  | { type: "HAS_SUBMITTED_FORM" }
  | { type: "REMOVING_BACKGROUND" }
  | { type: "FINISHED_REMOVING_BACKGROUND" }
  | { type: "DOWNLOAD_NAMETAG" }
  | { type: "FINISHED_DOWNLOAD_NAMETAG" }
  | { type: "HAS_REMOVED_PHOTO_BACKGROUND" }
  | { type: "TURN_OFF_REMOVED_PHOTO_BACKGROUND" }
  | { type: "OPEN_ALERT" }
  | { type: "CLOSE_ALERT" }
  | { type: "SET_ALERT_MESSAGE"; payload: AlertMessage };

export interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}
