import React, { useEffect, useRef, useState } from 'react';
import user from './DB';
import { gsap } from 'gsap';

function TNTBlock() {
  const [showBlast, setShowBlast] = useState(false);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [loginStatus, setloginStatus] = useState('');

  const tntRefs = useRef([]);
  tntRefs.current = [];

  const addToRefs = (el) => {
    if (el && !tntRefs.current.includes(el)) {
      tntRefs.current.push(el);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === user.username && password === user.password) {
      setloginStatus("Login Successfully!");
    } else {
      setloginStatus("Invalid Credentials");
      setShowBlast(true);
    }
  };

  useEffect(() => {
    if (showBlast && loginStatus === "Invalid Credentials") {
      const screenHeight = window.innerHeight;

      const tl = gsap.timeline();

      tl.fromTo(
        tntRefs.current,
        {
          y: 0,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: screenHeight,
          opacity: 1,
          duration: 5,
          ease: 'power2.inOut',
          stagger: 0.2, // One after another
          onComplete: () => {
            // Reset state after animation
            setShowBlast(false);
            tntRefs.current = []; // Clear references
          },
        }
      );
    }
  }, [showBlast,loginStatus]);

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-red-400 overflow-hidden p-3">
      {/* 💣 TNT blocks */}
      {showBlast &&
        Array.from({ length: 10 }).map((_, i) => (
          <img
            key={i}
            ref={addToRefs}
            src="/tnt.png"
            alt="TNT"
            className="w-10 h-10 absolute sm:w-20 sm:h-20"
            style={{
              top: 0,
              left: `${10 + i * 8}%`, // slightly spread out
            }}
          />
        ))}

      {/* 🔒 Login Form */}
      <form
        onSubmit={handleSubmit}
        className="z-10 border border-white/30 w-full h-1/2 p-3 text-center rounded-xl bg-white/10 backdrop-blur-md sm:w-1/3"
      >
        <h1 className="text-4xl font-bold">Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="border border-white/30 mt-5 w-full ps-2 outline-none"
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className="border border-white/30 mt-3 w-full ps-2 outline-none"
        /><br />
        <button className="bg-red-500 rounded px-4 py-2 mt-5 hover:bg-red-600 text-white">
          Login
        </button>
      </form>

      {loginStatus && (
        <p className="mt-4 text-center font-semibold text-white">{loginStatus}</p>
      )}
    </div>
  );
}

export default TNTBlock;
