import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import "./Components.css";

function Contact() {
  const form = useRef();
  const [sent, setSent] = useState("Submit");
  const [color, setColor] = useState("indigo");
  const sendEmail = (e) => {
    e.preventDefault();
    setSent("Loading...");
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        form.current,
        {
          publicKey: process.env.REACT_APP_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setSent("Sent");
          setColor("green");
          console.log("SUCCESS!");
        },
        (error) => {
          setSent("Failed");
          setColor("red");
          console.log("FAILED...", error.text);
        }
      );
  };
  return (
    <>
      <section class="text-gray-400 bg-gray-900 body-font relative">
        <hr />
        <div class="container px-5 py-10 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Contact Us
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Got something on your mind? Don't hesitate to reach out! Whether
              it's a query about our products, a partnership opportunity, or
              simply a friendly chat, we're here to listen. Fill out the form
              below and we'll be in touch promptly. Looking forward to
              connecting with you!.
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            {/* <div class="flex flex-wrap -m-2"> */}
            <form ref={form} onSubmit={sendEmail} class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-400">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-400">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    required
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  style={{ backgroundColor: color }}
                  className="flex h-fit w-fit mx-auto text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  type="submit"
                  value="Send"
                >
                  {sent}
                </button>
              </div>
            </form>
            {/* <div class="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
                <a class="text-indigo-400">example@email.com</a>
                <p class="leading-normal my-5">49 Smith St.
                  <br />Saint Cloud, MN 56301
                </p>
                <span class="inline-flex">
                  <a class="text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="ml-4 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="ml-4 text-gray-500">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                  </a>
                  <a class="ml-4 text-gray-500">
                    <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
