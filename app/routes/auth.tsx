import { usePuterStore } from "~/lib/puter";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const meta = () => {
  return [
    { title: "Auth" },
    { name: "description", content: "Auth Page" },
  ];
};

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Safely extract "next" param (e.g., ?next=/dashboard)
  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/";

  useEffect(() => {
    if (auth?.isAuthenticated) {
      navigate(next, { replace: true });
    }
  }, [auth?.isAuthenticated, navigate, next]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
          </div>

          <div>
            {isLoading ? (
              <motion.button
                className="auth-button"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Signing In...
              </motion.button>
            ) : auth?.isAuthenticated ? (
              <button className="auth-button" onClick={auth.signOut}>
                Sign Out
              </button>
            ) : (
              <button className="auth-button" onClick={auth.signIn}>
                Sign In with Puter
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
