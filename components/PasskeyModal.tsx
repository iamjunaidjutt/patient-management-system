"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
	const router = useRouter();
	const path = usePathname();
	const [isOpen, setIsOpen] = useState(true);
	const [passkey, setPasskey] = useState("");
	const [error, setError] = useState("");

	const encryptedKey =
		typeof window !== "undefined"
			? localStorage.getItem("accessKey")
			: null;

	useEffect(() => {
		const accessKey = encryptedKey && decryptKey(encryptedKey);

		if (path) {
			if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
				setIsOpen(false);
				router.push("/admin");
			} else {
				setIsOpen(true);
			}
		}
	}, [encryptedKey]);

	const validatePasskey = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
			const encryptedKey = encryptKey(passkey);
			localStorage.setItem("accessKey", encryptedKey);
			setIsOpen(false);
			router.push("/admin");
		} else {
			setError("Invalid passkey. Please try again.");
		}
	};

	const closeModal = () => {
		setIsOpen(false);
		router.push("/");
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent className="shad-alert-dialog">
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-start justify-between">
						Admin Access Verification
						<Image
							src={"/assets/icons/close.svg"}
							alt="close"
							width={20}
							height={20}
							onClick={() => closeModal()}
							className="cursor-pointer"
						/>
					</AlertDialogTitle>
					<AlertDialogDescription>
						To access the admin page, please enter the passkey.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<div>
					<InputOTP
						maxLength={6}
						value={passkey}
						onChange={(value) => setPasskey(value)}
					>
						<InputOTPGroup className="shad-otp">
							<InputOTPSlot className="shad-otp-slot" index={0} />
							<InputOTPSlot className="shad-otp-slot" index={1} />
							<InputOTPSlot className="shad-otp-slot" index={2} />
							<InputOTPSlot className="shad-otp-slot" index={3} />
							<InputOTPSlot className="shad-otp-slot" index={4} />
							<InputOTPSlot className="shad-otp-slot" index={5} />
						</InputOTPGroup>
					</InputOTP>
					{error && (
						<p className="shad-error text-14-regular mt-4 flex justify-center">
							{error}
						</p>
					)}
				</div>
				<AlertDialogFooter>
					<AlertDialogAction
						onClick={(e) => validatePasskey(e)}
						className="shad-primary-btn w-full"
					>
						Enter Admin Passkey
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default PasskeyModal;
