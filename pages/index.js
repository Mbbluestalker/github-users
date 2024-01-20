import Image from "next/image";
import { Inter } from "next/font/google";
import GithubUsers from "@/components/githubUsers";
import UserCard from "@/components/usercard";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch("https://api.github.com/users");
      if (!res.ok) {
        throw new Error("Unable to fetch data");
      }
      const data = await res.json();
      setUsers(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main className="p-5 md:p-20 w-full h-full flex flex-col">
      <GithubUsers />

      <div className="w-full flex flex-col items-center h-screen justify-center">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="h-full">
            {error ? (
              <div className="text-center">
                <h4 className="text-2xl text-red-600">Something went wrong!</h4>
              </div>
            ) : (
              <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-5 h-full w-full">
                {users.map((user) => (
                  <UserCard
                    name={user.login}
                    id={user.id}
                    img={user.avatar_url}
                    profile_link={user.html_url}
                    key={user.id}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
