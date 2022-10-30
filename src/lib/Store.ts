import { readable, writable } from "svelte/store";
import { getDataArray } from "../data/models/mod.js";

export const modelData = readable(getDataArray())
export const selectedEntity = writable(null)