import { Footer } from "flowbite-react";

export default function FooterCom() {
  return (
    <Footer container className="border-t border-purple-300">
      <div className="w-full flex justify-center">
        <Footer.Copyright by="MERN Blog" year={new Date().getFullYear()} />
      </div>
    </Footer>
  );
}
