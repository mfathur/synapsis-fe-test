"use server";

import { GOREST_API_ACCESS_TOKEN, GOREST_API_BASE_URL } from "@/utils/constant";
import { revalidatePath } from "next/cache";
import { setTimeout } from "timers/promises";

export const editUser = async (formData: FormData) => {
  "use server";

  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    status: formData.get("status"),
  };

  await fetch(`${GOREST_API_BASE_URL}/users`, {
    method: "PATCH",
    headers: new Headers({
      Authorization: `Bearer ${GOREST_API_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  });

  revalidatePath("/users");
};

export const addUser = async (formData: FormData) => {
  const body = {
    name: formData.get("name"),
    email: formData.get("email"),
    gender: formData.get("gender"),
    status: formData.get("status"),
  };

  const response = await fetch(`${GOREST_API_BASE_URL}/users`, {
    method: "POST",
    headers: new Headers({
      Authorization: `Bearer ${GOREST_API_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(body),
  });

  if (response.status == 201) {
    console.log("success");
  }

  revalidatePath("/users");
};

export const deleteUser = async (userId: number) => {
  await fetch(`${GOREST_API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: new Headers({
      Authorization: `Bearer ${GOREST_API_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    }),
  });
  revalidatePath("/users");
};
