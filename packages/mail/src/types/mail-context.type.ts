import type { LiteralUnion } from "type-fest";

export type MailTemplateType = LiteralUnion<"OTP" | "SYSTEM", string>;

// "allowObjectTypes"
export type MailContext<T = any> = Record<string, T>;
