import { createClient } from "@supabase/supabase-js";

const URL = "https://bgucbcvxuzjgmvmjefgo.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJndWNiY3Z4dXpqZ212bWplZmdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1NjIxOTgsImV4cCI6MjAxNDEzODE5OH0.Nez1f92KPZoPFeH2GoxS_To1fDup5u__c7K7jGDtr1s";

export const supabase = createClient(URL, API_KEY);
