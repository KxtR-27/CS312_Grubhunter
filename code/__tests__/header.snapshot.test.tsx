import { act, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Header from "@/grubhunter-application/components/header";

// had type errors; fix by manual import instead of global injection
import { jest, describe, expect, it, test } from "@jest/globals";

jest.mock("next-auth/react");

describe("Header Component", () => {
	it("should show *sign-in* button when logged *out*", async () => {
		(useSession as jest.Mock).mockReturnValue([{}, "unauthenticated"]);

		const component = await act(async () => render(<Header />));

		expect(component).toMatchSnapshot();
	});

	it("should show *sign-out* button when logged *in*", async () => {
		(useSession as jest.Mock).mockReturnValue([
			{
				name: "test username",
				fdlst_private_userId: "test userId",
			},
			"authenticated",
		]);

		const component = await act(async () => render(<Header />));

		expect(component).toMatchSnapshot();
	});
});
