import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashboardProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="my-7 font-semibold font-sans text-3xl">Profile</h1>
        <form
          className="flex flex-col justify-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
            <img
              src={currentUser.profile}
              alt=""
              className="w-full h-full rounded-full object-cover border-8 border-[lightgray]"
            />
          </div>
          <TextInput
            type="text"
            id="username"
            placeholder="Enter update name"
            defaultValue={currentUser.name}
            className=""
          />
          <TextInput
            type="text"
            id="username"
            placeholder="Enter update email"
            defaultValue={currentUser.email}
          />
          <TextInput
            type="text"
            id="username"
            placeholder="Enter update password"
          />
          <Button type="submit" gradientDuoTone={`purpleToBlue`} outline>
            Update
          </Button>
        </form>
        <div className="my-4 flex flex-col items-center gap-2">
          <span className="hover:text-red-600 cursor-pointer">
            Delete Account?
          </span>
          <span className="hover:text-red-600 cursor-pointer">Sign Out</span>
        </div>
      </div>
    </>
  );
}
