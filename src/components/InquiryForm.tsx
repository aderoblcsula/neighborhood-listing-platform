"use client";

import { useId, useRef, useState, type FormEvent } from "react";

interface InquiryFormProps {
	propertyId: string;
	address: string;
}

export default function InquiryForm({
	propertyId,
	address,
}: InquiryFormProps) {
	const id = useId();
	const submitting = useRef(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [feedback, setFeedback] = useState("");
	const [succeeded, setSucceeded] = useState(false);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (submitting.current) return;

		const form = event.currentTarget;
		const fields = new FormData(form);
		const email = String(fields.get("email") ?? "").trim();
		const message = String(fields.get("message") ?? "").trim();

		setSucceeded(false);

		if (message.length < 10) {
			setFeedback("Please enter at least ten characters in your message.");
			return;
		}

		submitting.current = true;
		setIsSubmitting(true);
		setFeedback("Submitting your inquiry…");

		try {
			const response = await fetch("/api/inquiries", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					property_id: propertyId,
					inquirer_email: email,
					message,
				}),
			});

			if (response.status === 201) {
				setSucceeded(true);
				setFeedback("Your inquiry was submitted.");
				form.reset();
			} else if (response.status === 404 || response.status === 403) {
				setFeedback("This property is not currently accepting inquiries.");
			} else if (response.status === 400) {
				setFeedback("Check your email and message, then try again.");
			} else {
				setFeedback(
					"Submission could not be confirmed. Please try again later.",
				);
			}
		} catch {
			setFeedback(
				"Submission could not be confirmed. Please check your connection.",
			);
		} finally {
			submitting.current = false;
			setIsSubmitting(false);
		}
	}

	const inputClass =
		"mt-1 w-full rounded-lg border border-slate-400 bg-white p-3 text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2";

	return (
		<form
			onSubmit={handleSubmit}
			aria-label={`Send an inquiry about ${address}`}
			className="mt-5 border-t border-slate-200 pt-4"
		>
			<h4 className="font-semibold text-slate-950">Ask about this property</h4>
			<p className="mt-1 text-sm text-slate-700">
				No account is required. Your inquiry is visible to the property
				owner and administrators.
			</p>

			<label
				htmlFor={`${id}-email`}
				className="mt-4 block text-sm font-medium text-slate-950"
			>
				Email address (required)
			</label>
			<input
				id={`${id}-email`}
				name="email"
				type="email"
				autoComplete="email"
				maxLength={254}
				required
				readOnly={isSubmitting}
				className={inputClass}
			/>

			<label
				htmlFor={`${id}-message`}
				className="mt-4 block text-sm font-medium text-slate-950"
			>
				Message (required)
			</label>
			<p id={`${id}-help`} className="mt-1 text-sm text-slate-600">
				Enter between 10 and 3,000 characters.
			</p>
			<textarea
				id={`${id}-message`}
				name="message"
				rows={4}
				minLength={10}
				maxLength={3000}
				required
				readOnly={isSubmitting}
				aria-describedby={`${id}-help`}
				className={inputClass}
			/>

			<button
				type="submit"
				aria-disabled={isSubmitting}
				className="mt-4 min-h-11 rounded-lg bg-blue-700 px-4 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 aria-disabled:opacity-60"
			>
				{isSubmitting ? "Sending…" : "Send inquiry"}
			</button>

			<p
				role="status"
				aria-live="polite"
				aria-atomic="true"
				className={`mt-3 text-sm ${
					succeeded ? "text-green-800" : "text-slate-800"
				}`}
			>
				{feedback}
			</p>
		</form>
	);
}