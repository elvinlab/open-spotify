import { getSession } from "next-auth/react";
import { Sidebar } from "../components/Sidebar";
import { Container } from "./../components/Container";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Container />
      </main>

      {/*Music player  */}
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
