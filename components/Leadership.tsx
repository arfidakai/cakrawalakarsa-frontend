import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getLeadership } from "@/lib/strapi";
import { LeadershipClient } from "./LeadershipClient";

export async function Leadership() {
  const { data: leaders } = await getLeadership();

  return <LeadershipClient leaders={leaders} />;
}
