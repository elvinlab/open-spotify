import { getSession } from "next-auth/react";
import { Player } from "../components/Player";
import { Sidebar } from "../components/Sidebar";
import { Container } from "./../components/Container";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Container />
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
