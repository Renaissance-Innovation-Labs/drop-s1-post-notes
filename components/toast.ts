"use client";
import { toast } from "react-toastify";

export const toastError = (errorMessage: string) => {
	if (errorMessage?.includes("Unauthorized")) {
		return;
	} else {
		return toast.error(errorMessage, {
			position: "top-center",
		});
	}
};

export const toastSuccess = (message: string) => {
	return toast.success(message, {
		position: "top-center",
	});
};

export const toastWarning = (message: string) => {
	return toast.warning(message, {
		position: "top-center",
	});
};
