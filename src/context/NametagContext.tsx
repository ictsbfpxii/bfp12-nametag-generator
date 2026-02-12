import { createContext, useContext, useReducer, type ReactNode } from "react";

import type { ContextProps } from "../types/Types";

import { type State, type Action } from "../types/Types";

const initialState: State = {
  selectedPhoto: null,
  preview: null,
  accountNumber: "",
  rank: "",
  firstName: "",
  lastName: "",
  middleInitial: "",
  nickname: "",
  office: "",
  sectionDivision: "",
  stationProvinceAddress: "",
  photo: null,
  isEditingPhoto: false,
  savedNametag: null,
  isSaving: false,
  hasSaved: false,
  hasSubmitted: false,
  isProcessing: false,
  isDownloading: false,
  isBackgroundRemoved: false,
  openAlert: false,
  alertMessage: null,
};

const NametagContext = createContext<ContextProps | null>(null);

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_SELECTED_PHOTO":
      return { ...state, selectedPhoto: action.payload };
    case "REMOVE_SELECTED_PHOTO":
      return { ...state, selectedPhoto: null };
    case "SET_PHOTO_PREVIEW":
      return { ...state, preview: action.payload };
    case "REMOVE_PHOTO_PREVIEW":
      return { ...state, preview: null };
    case "SET_ACCOUNT_NUMBER":
      return { ...state, accountNumber: action.payload };
    case "SET_RANK":
      return { ...state, rank: action.payload };
    case "SET_FIRST_NAME":
      return { ...state, firstName: action.payload };
    case "SET_LAST_NAME":
      return { ...state, lastName: action.payload };
    case "SET_MIDDLE_INITIAL":
      return { ...state, middleInitial: action.payload };
    case "SET_NICKNAME":
      return { ...state, nickname: action.payload };
    case "SET_OFFICE":
      return { ...state, office: action.payload };
    case "SET_SECTION_OR_DIVISION":
      return { ...state, sectionDivision: action.payload };
    case "SET_STATION_OR_PROVINCE_ADDRESS":
      return { ...state, stationProvinceAddress: action.payload };
    case "SET_PHOTO":
      return { ...state, photo: action.payload };
    case "CLEAR_FORM":
      return { ...state, ...initialState };
    case "EDIT_PHOTO":
      return { ...state, isEditingPhoto: true };
    case "TURN_OFF_EDIT_PHOTO":
      return { ...state, isEditingPhoto: false };
    case "SAVE_NAMETAG":
      return { ...state, savedNametag: action.payload };
    case "SAVING_NAMETAG":
      return { ...state, isSaving: true };
    case "NOT_SAVING_NAMETAG":
      return { ...state, isSaving: false };
    case "HAS_SAVED_NAMETAG":
      return { ...state, hasSaved: true };
    case "TURN_OFF_HAS_SAVED_NAMETAG":
      return { ...state, hasSaved: false };
    case "HAS_SUBMITTED_FORM":
      return { ...state, hasSubmitted: true };
    case "REMOVING_BACKGROUND":
      return { ...state, isProcessing: true };
    case "FINISHED_REMOVING_BACKGROUND":
      return { ...state, isProcessing: false };
    case "DOWNLOAD_NAMETAG":
      return { ...state, isDownloading: true };
    case "FINISHED_DOWNLOAD_NAMETAG":
      return { ...state, isDownloading: false };
    case "HAS_REMOVED_PHOTO_BACKGROUND":
      return { ...state, isBackgroundRemoved: true };
    case "TURN_OFF_REMOVED_PHOTO_BACKGROUND":
      return { ...state, isBackgroundRemoved: false };
    case "OPEN_ALERT":
      return { ...state, openAlert: true };
    case "CLOSE_ALERT":
      return { ...state, openAlert: false };
    case "SET_ALERT_MESSAGE":
      return { ...state, alertMessage: action.payload };

    default:
      return state;
  }
}

export function NametagProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NametagContext value={{ state, dispatch }}>{children}</NametagContext>
  );
}

export const useNametag = () => {
  const context = useContext(NametagContext);
  if (!context)
    throw new Error("useCounter must be used within a CounterProvider");
  return context;
};
