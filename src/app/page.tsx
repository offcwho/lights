import { ByRoom } from "@/widgets/by-room";
import { Hero } from "@/widgets/hero";
import { Trends } from "@/widgets/trends";

export default function Home() {
  return (
    <>
      <Hero />
      <ByRoom />
      <Trends />
    </>
  );
}
