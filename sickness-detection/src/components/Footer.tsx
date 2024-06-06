import * as React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col items-center pt-4 pb-4 w-full text-white bg-violet-950 max-md:max-w-full">
      <div className="flex gap-5 justify-between items-start px-5 mt-24 w-full text-sm max-w-[1149px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col self-start">
          <div className="flex gap-1.5 items-center text-2xl font-medium text-white">
            <div className="shrink-0 self-stretch my-auto w-1 h-5" />
            <div className="shrink-0 self-stretch my-auto w-1 h-4" />
            <div className="shrink-0 self-stretch my-auto w-1 h-3" />
            <div className="self-stretch">
              <span className="font-light text-white">Site</span>Logo
            </div>
          </div>
          <div className="mt-12 text-lg font-bold max-md:mt-10">Product</div>
          <div className="mt-10">Landing Page</div>
          <div className="mt-5">Popup Builder</div>
          <div className="mt-5">Web-design</div>
          <div className="mt-5">Content</div>
          <div className="mt-6">Integrations</div>
        </div>
        <div className="flex flex-col my-auto">
          <div className="text-lg font-bold">Use Cases</div>
          <div className="mt-10 max-md:mr-1.5">Web-designers</div>
          <div className="mt-5">Marketers</div>
          <div className="mt-5">Small Business</div>
          <div className="mt-5">Website Builder</div>
        </div>
        <div className="flex flex-col self-end mt-20 whitespace-nowrap max-md:mt-10">
          <div className="text-lg font-bold">Resources</div>
          <div className="mt-10">Academy</div>
          <div className="mt-5">Blog</div>
          <div className="mt-5">Themes</div>
          <div className="mt-6">Hosting</div>
          <div className="mt-5">Developers</div>
          <div className="mt-5">Support</div>
        </div>
        <div className="flex flex-col my-auto">
          <div className="text-lg font-bold">Company</div>
          <div className="mt-9">About Us</div>
          <div className="mt-6">Careers</div>
          <div className="mt-6">FAQs</div>
          <div className="mt-5">Teams</div>
          <div className="mt-6">Contact Us</div>
        </div>
        <div className="flex flex-col self-start mt-20 text-lg font-bold text-white max-md:mt-10">
          <div>Let&apos;s do it!</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8bcf9feb9e7b2284ffce4b782967790fab78ff6b6d7fa454e930878c5203972e?"
            className="self-center mt-4 aspect-[9.09] w-[210px]"
          />
        </div>
      </div>
      <div className="self-stretch mt-11 w-full bg-white border border-white border-solid min-h-[1px] max-md:mt-10 max-md:max-w-full" />
      <div className="flex gap-5 px-5 mt-4 w-full max-w-[1113px] max-md:flex-wrap max-md:max-w-full">
        <div className="flex gap-5 text-sm max-md:flex-wrap">
          <div className="grow">Privacy Policy</div>
          <div>Terms of Use</div>
          <div className="flex-auto">Sales and Refunds</div>
          <div>Legal</div>
          <div>Site Map</div>
        </div>
        <div className="flex-auto my-auto text-xs font-light">
          © 2021 All Rights Reserved
        </div>
      </div>
    </div>
  );
}

