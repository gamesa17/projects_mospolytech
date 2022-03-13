import { random } from "@common/random";
import { BADGE_COLORS } from "./badge.constants";

export const getRandomBadgeColor = (): string => BADGE_COLORS[random(0, BADGE_COLORS.length - 1)];
