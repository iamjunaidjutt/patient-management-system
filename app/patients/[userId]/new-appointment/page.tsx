import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

import * as Sentry from "@sentry/nextjs";

export default async function NewAppointment({
	params: { userId },
}: SearchParamProps) {
	const patient = await getPatient(userId);

	Sentry.metrics.set("user_view_new-appointment", patient.name);

	return (
		<div className="flex h-screen max-h-screen">
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[496px]">
					<Link href={"/"}>
						<Image
							src="/assets/icons/logo-full.svg"
							width={1000}
							height={1000}
							alt="Patient"
							className="mb-12 h-10 w-fit"
						/>
					</Link>
					<AppointmentForm
						type="create"
						userId={userId}
						patientId={patient.$id}
					/>
					<p className="copyright mt-10 py-12">
						&copy; 2024 CarePulse.
					</p>
				</div>
			</section>
			<Image
				src="/assets/images/appointment-img.png"
				width={1000}
				height={1000}
				alt="Patient"
				className="side-img max-w-[390px] bg-bottom"
			/>
		</div>
	);
}
