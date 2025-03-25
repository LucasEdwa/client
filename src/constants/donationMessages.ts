import { TDonationMessages, TDonationMessageGenerator } from "../types/types";

export const generateDonationMessage: TDonationMessageGenerator = (amount, amountMessage) =>
  `Every month your ${amount} kr ${amountMessage}. As a World Parent, you are helping to give everyone in Gambia hope to continue.`;

export const generateCompanyDonationMessage = (amount: string, amountMessage: string) =>
  `Every month your ${amount} kr ${amountMessage}. As donor you give hopp to Gambias communite to continue healing and growing to a better place on earth.`;

export const donationMessages: TDonationMessages = {
  "100 KR": generateDonationMessage(
    "100",
    "support mothers in Gambia by providing 10-15 reusable diapers, a sustainable option for low-income families"
  ),
  "200 KR": generateDonationMessage(
    "200",
    "supply a mother with approximately 800g of milk powder, along with a baby bottle to support infant nutrition"
  ),
  "400 KR": generateDonationMessage(
    "400",
    "donation could cover 4 to 10 basic school textbooks in Gambia, focusing on core subjects like math, language, and science"
  ),
  "OPTIONAL": generateDonationMessage("optional", "donation could cover 4 to 10 basic school textbooks in Gambia, focusing on core subjects like math, language, and science"),
};

export const companyDonationMessages: TDonationMessages = {
  "10000 KR": generateCompanyDonationMessage("10000", "support mothers in Gambia by providing 10-15 reusable diapers, a sustainable option for low-income families"),
  "40000 KR": generateCompanyDonationMessage("40000", "supply a mother with approximately 800g of milk powder, along with a baby bottle to support infant nutrition"),
  "OPTIONAL": generateCompanyDonationMessage("optional", "donation could cover 4 to 10 basic school textbooks in Gambia, focusing on core subjects like math, language, and science"),
}; 