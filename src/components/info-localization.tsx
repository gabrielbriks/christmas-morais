export function InfoLocalization() {
  const urlZap = "https://wa.me/5561986475237";

  const urlLocalizacaoWaze = "https://waze.com/ul/h6vjvfwku9";
  // "https://www.waze.com/ul?ll=-15.838091661802226%2C-48.03969506310285&navigate=yes&zoom=17";

  const urlLocalizacaoMaps = "https://maps.app.goo.gl/DpEDYW7rasrrBK557";

  return (
    <div className="grid gap-4 py-4">
      <div className="flex justify-center items-center mt-5">
        <button
          className="max-w-[220px] w-full min-h-[40px] bg-cyan-700 outline-none p-1 text-white text-sm rounded-md flex justify-center items-center gap-3"
          onClick={() => window.open(urlLocalizacaoWaze, "_blank")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 512 512"
            style={{ fill: "#fff" }}
          >
            <path d="M502.17 201.67C516.69 287.53 471.23 369.59 389 409.8c13 34.1-12.4 70.2-48.32 70.2a51.68 51.68 0 0 1-51.57-49c-6.44.19-64.2 0-76.33-.64A51.69 51.69 0 0 1 159 479.92c-33.86-1.36-57.95-34.84-47-67.92-37.21-13.11-72.54-34.87-99.62-70.8-13-17.28-.48-41.8 20.84-41.8 46.31 0 32.22-54.17 43.15-110.26C94.8 95.2 193.12 32 288.09 32c102.48 0 197.15 70.67 214.08 169.67zM373.51 388.28c42-19.18 81.33-56.71 96.29-102.14 40.48-123.09-64.15-228-181.71-228-83.45 0-170.32 55.42-186.07 136-9.53 48.91 5 131.35-68.75 131.35C58.21 358.6 91.6 378.11 127 389.54c24.66-21.8 63.87-15.47 79.83 14.34 14.22 1 79.19 1.18 87.9.82a51.69 51.69 0 0 1 78.78-16.42zM205.12 187.13c0-34.74 50.84-34.75 50.84 0s-50.84 34.74-50.84 0zm116.57 0c0-34.74 50.86-34.75 50.86 0s-50.86 34.75-50.86 0zm-122.61 70.69c-3.44-16.94 22.18-22.18 25.62-5.21l.06.28c4.14 21.42 29.85 44 64.12 43.07 35.68-.94 59.25-22.21 64.11-42.77 4.46-16.05 28.6-10.36 25.47 6-5.23 22.18-31.21 62-91.46 62.9-42.55 0-80.88-27.84-87.9-64.25z" />
          </svg>
          Acessar Localização Waze
        </button>
      </div>

      <div className="flex justify-center items-center mt-5">
        <button
          className="max-w-[220px] w-full min-h-[40px] bg-white font-medium outline-none p-1 text-zinc-900 text-sm rounded-md flex justify-center items-center gap-3"
          onClick={() => window.open(urlLocalizacaoMaps, "_blank")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 48 48"
          >
            <path
              fill="#1c9957"
              d="M42,39V9c0-1.657-1.343-3-3-3H9C7.343,6,6,7.343,6,9v30c0,1.657,1.343,3,3,3h30C40.657,42,42,40.657,42,39z"
            ></path>
            <path
              fill="#3e7bf1"
              d="M9,42h30c1.657,0-15-16-15-16S7.343,42,9,42z"
            ></path>
            <path
              fill="#cbccc9"
              d="M42,39V9c0-1.657-16,15-16,15S42,40.657,42,39z"
            ></path>
            <path
              fill="#efefef"
              d="M39,42c1.657,0,3-1.343,3-3v-0.245L26.245,23L23,26.245L38.755,42H39z"
            ></path>
            <path
              fill="#ffd73d"
              d="M42,9c0-1.657-1.343-3-3-3h-0.245L6,38.755V39c0,1.657,1.343,3,3,3h0.245L42,9.245V9z"
            ></path>
            <path
              fill="#d73f35"
              d="M36,2c-5.523,0-10,4.477-10,10c0,6.813,7.666,9.295,9.333,19.851C35.44,32.531,35.448,33,36,33s0.56-0.469,0.667-1.149C38.334,21.295,46,18.813,46,12C46,6.477,41.523,2,36,2z"
            ></path>
            <path
              fill="#752622"
              d="M36 8.5A3.5 3.5 0 1 0 36 15.5A3.5 3.5 0 1 0 36 8.5Z"
            ></path>
            <path
              fill="#fff"
              d="M14.493,12.531v2.101h2.994c-0.392,1.274-1.455,2.185-2.994,2.185c-1.833,0-3.318-1.485-3.318-3.318s1.486-3.318,3.318-3.318c0.824,0,1.576,0.302,2.156,0.799l1.548-1.547C17.22,8.543,15.92,8,14.493,8c-3.038,0-5.501,2.463-5.501,5.5s2.463,5.5,5.501,5.5c4.81,0,5.637-4.317,5.184-6.461L14.493,12.531z"
            ></path>
          </svg>
          Acessar Localização Maps
        </button>
      </div>
    </div>
  );
}
