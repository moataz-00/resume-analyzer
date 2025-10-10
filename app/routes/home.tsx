import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { resumes } from "~/constants";
import { usePuterStore } from "~/lib/puter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Application Tracker | D-Bugerz" },
    { name: "description", content: "Track your applications and get resume feedback easily." },
  ];
}

export default function Home() {
  const { auth, isLoading } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!auth?.isAuthenticated) {
        // Save intended path and redirect to login
        navigate(`/auth?next=${encodeURIComponent(location.pathname)}`);
      }
    }
  }, [auth?.isAuthenticated, isLoading, navigate, location.pathname]);

  // Optionally show loading state while auth is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[url('/images/bg-main.svg')] bg-cover bg-no-repeat">
      <Navbar />

      <section className="main-section text-center py-16">
        <div className="page-heading space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Track Your Applications & Resume Ratings
          </h1>
          <h2 className="text-lg text-gray-600">
            Review your submissions and get instant feedback
          </h2>
        </div>

        {resumes?.length > 0 ? (
          <div className="resumes-section mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-10">
            No resumes found yet. Start uploading to see them here!
          </p>
        )}
      </section>
    </main>
  );
}
