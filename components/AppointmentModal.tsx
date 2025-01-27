import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { Appointment } from "@/types/appwrite.types";
import AppointmentForm from "./forms/AppointmentForm";

const AppointmentModal = ({
	type,
	patientId,
	userId,
	appointment,
}: {
	type: "schedule" | "cancel";
	patientId: string;
	userId: string;
	appointment?: Appointment;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button
					variant={"ghost"}
					className={`capitalize ${
						type === "schedule" && "text-green-500"
					}`}
				>
					{type}
				</Button>
			</DialogTrigger>
			<DialogContent className="shad-dialog sm:max-w-md">
				<DialogHeader className="mb-4 space-y-3">
					<DialogTitle className="capitalize">
						{type} Appointment
					</DialogTitle>
					<DialogDescription>
						Please fill in the following details for {type} an
						appointment
					</DialogDescription>
				</DialogHeader>
				<AppointmentForm
					type={type}
					userId={userId}
					patientId={patientId}
					appointment={appointment}
					setOpen={setIsOpen}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default AppointmentModal;
