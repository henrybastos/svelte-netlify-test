import { writable } from "svelte/store";
import type { Items } from "../types/Item";

export const Categories = writable(['saude', 'futuro', 'investimentos', 'transporte']);

export const TotalBalance = writable(0);

export const ExpensesBalance = writable(0);
export const IncomesBalance = writable(0);
export const SavingsBalance = writable(0);