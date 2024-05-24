import { PlatformPercentiles, getPercentiles } from "@/lib/metrics";
import {
	Table,
	TableHeader,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from "./components/ui/table";
import { NeonRegion, PlatformName, neonRegionSortOrder, neonRegionsToNames, platformRegionsToNames } from "@/lib/platforms";
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";

const neonSvg = (
  <svg width="36" height="24" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_58_44)">
  <path fillRule="evenodd" clipRule="evenodd" d="M0 6.207C0 4.5608 0.65395 2.98203 1.81799 1.81799C2.98203 0.65395 4.5608 0 6.207 0L29.793 0C31.4392 0 33.018 0.65395 34.182 1.81799C35.346 2.98203 36 4.5608 36 6.207V26.267C36 29.813 31.512 31.352 29.336 28.553L22.531 19.799V30.414C22.531 31.8955 21.9425 33.3163 20.8949 34.3639C19.8473 35.4115 18.4265 36 16.945 36H6.207C4.5608 36 2.98203 35.346 1.81799 34.182C0.65395 33.018 0 31.4392 0 29.793L0 6.207ZM6.207 4.966C5.521 4.966 4.966 5.521 4.966 6.206V29.793C4.966 30.479 5.521 31.035 6.206 31.035H17.131C17.474 31.035 17.565 30.757 17.565 30.414V16.18C17.565 12.633 22.053 11.094 24.23 13.894L31.035 22.647V6.207C31.035 5.521 31.099 4.966 30.414 4.966H6.207Z" fill="#00E0D9"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M0 6.207C0 4.5608 0.65395 2.98203 1.81799 1.81799C2.98203 0.65395 4.5608 0 6.207 0L29.793 0C31.4392 0 33.018 0.65395 34.182 1.81799C35.346 2.98203 36 4.5608 36 6.207V26.267C36 29.813 31.512 31.352 29.336 28.553L22.531 19.799V30.414C22.531 31.8955 21.9425 33.3163 20.8949 34.3639C19.8473 35.4115 18.4265 36 16.945 36H6.207C4.5608 36 2.98203 35.346 1.81799 34.182C0.65395 33.018 0 31.4392 0 29.793L0 6.207ZM6.207 4.966C5.521 4.966 4.966 5.521 4.966 6.206V29.793C4.966 30.479 5.521 31.035 6.206 31.035H17.131C17.474 31.035 17.565 30.757 17.565 30.414V16.18C17.565 12.633 22.053 11.094 24.23 13.894L31.035 22.647V6.207C31.035 5.521 31.099 4.966 30.414 4.966H6.207Z" fill="url(#paint0_linear_58_44)"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M0 6.207C0 4.5608 0.65395 2.98203 1.81799 1.81799C2.98203 0.65395 4.5608 0 6.207 0L29.793 0C31.4392 0 33.018 0.65395 34.182 1.81799C35.346 2.98203 36 4.5608 36 6.207V26.267C36 29.813 31.512 31.352 29.336 28.553L22.531 19.799V30.414C22.531 31.8955 21.9425 33.3163 20.8949 34.3639C19.8473 35.4115 18.4265 36 16.945 36H6.207C4.5608 36 2.98203 35.346 1.81799 34.182C0.65395 33.018 0 31.4392 0 29.793L0 6.207ZM6.207 4.966C5.521 4.966 4.966 5.521 4.966 6.206V29.793C4.966 30.479 5.521 31.035 6.206 31.035H17.131C17.474 31.035 17.565 30.757 17.565 30.414V16.18C17.565 12.633 22.053 11.094 24.23 13.894L31.035 22.647V6.207C31.035 5.521 31.099 4.966 30.414 4.966H6.207Z" fill="url(#paint1_linear_58_44)" fillOpacity="0.4"/>
  </g>
  <defs>
  <linearGradient id="paint0_linear_58_44" x1="36" y1="36" x2="4.345" y2="-1.3837e-06" gradientUnits="userSpaceOnUse">
  <stop stopColor="#62F755"/>
  <stop offset="1" stopColor="#8FF986" stopOpacity="0"/>
  </linearGradient>
  <linearGradient id="paint1_linear_58_44" x1="36" y1="36" x2="14.617" y2="27.683" gradientUnits="userSpaceOnUse">
  <stop stopOpacity="0.9"/>
  <stop offset="1" stopColor="#1A1A1A" stopOpacity="0"/>
  </linearGradient>
  <clipPath id="clip0_58_44">
  <rect width="128" height="36" fill="white"/>
  </clipPath>
  </defs>
  </svg>
)

const deploymentPlatforms: {[platformName: string]: JSX.Element} = {
	vercel: (
		<svg
			className="w-5 h-5"
			width="76"
			height="65"
			viewBox="0 0 76 65"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#ffffff" />
		</svg>
	),
	fly: (
		<svg
			viewBox="0 0 167 151"
			xmlns="http://www.w3.org/2000/svg"
			fillRule="evenodd"
			clipRule="evenodd"
			strokeLinejoin="round"
			strokeMiterlimit="2"
			className="w-5 h-5"
		>
			<path
				d="M116.78 20.613h19.23c17.104 0 30.99 13.886 30.99 30.99v67.618c0 17.104-13.886 30.99-30.99 30.99h-1.516c-8.803-1.377-12.621-4.017-15.57-6.248L94.475 123.86a3.453 3.453 0 00-4.329 0l-7.943 6.532-22.37-18.394a3.443 3.443 0 00-4.326 0l-31.078 27.339c-6.255 5.087-10.392 4.148-13.075 3.853C4.424 137.503 0 128.874 0 119.221V51.603c0-17.104 13.886-30.99 30.993-30.99H50.18l-.035.077-.647 1.886-.201.647-.871 3.862-.12.678-.382 3.868-.051 1.062-.008.372.036 1.774.088 1.039.215 1.628.275 1.464.326 1.349.423 1.46 1.098 3.092.362.927 1.912 4.04.675 1.241 2.211 3.795.846 1.369 3.086 4.544.446.602 4.015 5.226 1.297 1.608 4.585 5.36.942 1.031 3.779 4.066 1.497 1.55 2.474 2.457-.497.415-.309.279a30.309 30.309 0 00-2.384 2.49c-.359.423-.701.86-1.025 1.31-.495.687-.938 1.41-1.324 2.164-.198.391-.375.792-.531 1.202a11.098 11.098 0 00-.718 3.267l-.014.966c.035 1.362.312 2.707.819 3.972a11.06 11.06 0 002.209 3.464 11.274 11.274 0 002.329 1.896c.731.447 1.51.816 2.319 1.096 1.76.597 3.627.809 5.476.623h.01a12.347 12.347 0 004.516-1.341 11.647 11.647 0 001.724-1.116 11.067 11.067 0 003.479-4.626c.569-1.422.848-2.941.823-4.471l-.044-.799a11.305 11.305 0 00-.749-3.078c-.17-.429-.364-.848-.58-1.257-.4-.752-.856-1.473-1.362-2.158-.232-.313-.472-.62-.72-.921a29.81 29.81 0 00-2.661-2.787l-.669-.569 1.133-1.119 4.869-5.085 1.684-1.849 2.618-2.945 1.703-1.992 2.428-2.957 1.644-2.067 2.414-3.228 1.219-1.67 1.729-2.585 1.44-2.203 2.713-4.725 1.552-3.1.045-.095 1.188-2.876c.015-.037.029-.075.04-.114l1.28-3.991.134-.582.555-3.177.108-.86.033-.527.038-1.989-.01-.371-.102-1.781-.126-1.383-.63-3.989a1.521 1.521 0 00-.037-.159l-.809-2.949-.279-.82-.364-.907zm9.141 84.321c-4.007.056-7.287 3.336-7.343 7.342.059 4.006 3.337 7.284 7.343 7.341 4.005-.058 7.284-3.335 7.345-7.341-.058-4.006-3.338-7.286-7.345-7.342z"
				fill="url(#_Radial1)"
			/>
			<path
				d="M72.499 147.571l-1.296 1.09a6.802 6.802 0 01-4.253 1.55H30.993a30.867 30.867 0 01-19.639-7.021c2.683.295 6.82 1.234 13.075-3.853l31.078-27.339a3.443 3.443 0 014.326 0l22.37 18.394 7.943-6.532a3.453 3.453 0 014.329 0l24.449 20.103c2.949 2.231 6.767 4.871 15.57 6.248H118.23a6.919 6.919 0 01-3.993-1.33l-.285-.22-1.207-1.003a2.377 2.377 0 00-.32-.323 21845.256 21845.256 0 00-18.689-15.497 2.035 2.035 0 00-2.606.006s.044.052-18.386 15.491c-.09.075-.172.154-.245.236zm53.422-42.637c-4.007.056-7.287 3.336-7.343 7.342.059 4.006 3.337 7.284 7.343 7.341 4.005-.058 7.284-3.335 7.345-7.341-.058-4.006-3.338-7.286-7.345-7.342zM78.453 82.687l-2.474-2.457-1.497-1.55-3.779-4.066-.942-1.031-4.585-5.36-1.297-1.609-4.015-5.225-.446-.602-3.086-4.544-.846-1.369-2.211-3.795-.675-1.241-1.912-4.04-.362-.927-1.098-3.092-.423-1.46-.326-1.349-.275-1.465-.215-1.627-.088-1.039-.036-1.774.008-.372.051-1.062.382-3.869.12-.677.871-3.862.201-.647.647-1.886.207-.488 1.03-2.262.714-1.346.994-1.64.991-1.46.706-.928.813-.98.895-.985.767-.771 1.867-1.643 1.365-1.117c.033-.028.067-.053.102-.077l1.615-1.092 1.283-.818L65.931 3.8c.037-.023.079-.041.118-.059l3.456-1.434.319-.12 3.072-.899 1.297-.291 1.754-.352L77.11.468l1.784-.222L80.11.138 82.525.01l.946-.01 1.791.037.466.026 2.596.216 3.433.484.397.083 3.393.844.996.297 1.107.383 1.348.51 1.066.452 1.566.738.987.507 1.774 1.041.661.407 2.418 1.765.694.602 1.686 1.536.083.083 1.43 1.534.492.555 1.678 2.23.342.533 1.332 2.249.401.771.751 1.678.785 1.959.279.82.809 2.949c.015.052.027.105.037.159l.63 3.988.126 1.384.102 1.781.01.371-.038 1.989-.033.527-.108.86-.555 3.177-.134.582-1.28 3.991a1.186 1.186 0 01-.04.114l-1.188 2.876-.045.095-1.552 3.1-2.713 4.725-1.44 2.203-1.729 2.585-1.219 1.67-2.414 3.228-1.644 2.067-2.428 2.957-1.703 1.992-2.618 2.945-1.684 1.849-4.869 5.085-1.133 1.119.669.569c.946.871 1.835 1.8 2.661 2.787.248.301.488.608.72.921.506.685.962 1.406 1.362 2.158.216.407.409.828.58 1.257.389.985.651 2.026.749 3.078l.044.799c.025 1.53-.255 3.05-.823 4.471a11.057 11.057 0 01-3.479 4.625c-.541.424-1.118.796-1.724 1.117a12.347 12.347 0 01-4.516 1.341h-.01a12.996 12.996 0 01-5.476-.623 11.933 11.933 0 01-2.319-1.096 11.268 11.268 0 01-2.329-1.896 11.06 11.06 0 01-2.209-3.464 11.468 11.468 0 01-.819-3.972l.014-.966c.073-1.119.315-2.221.718-3.267.157-.411.334-.812.531-1.202.386-.755.83-1.477 1.324-2.164.323-.45.667-.887 1.025-1.31a30.309 30.309 0 012.384-2.49l.309-.279.497-.415z"
				fill="#24175b"
			/>
			<path
				d="M71.203 148.661l19.927-16.817a2.035 2.035 0 012.606-.006l20.216 16.823a6.906 6.906 0 004.351 1.55H66.877a6.805 6.805 0 004.326-1.55zm12.404-60.034l.195.057c.063.03.116.075.173.114l.163.144c.402.37.793.759 1.169 1.157.265.283.523.574.771.875.315.38.61.779.879 1.194.116.183.224.368.325.561.088.167.167.34.236.515.122.305.214.627.242.954l-.006.614a3.507 3.507 0 01-1.662 2.732 4.747 4.747 0 01-2.021.665l-.759.022-.641-.056a4.964 4.964 0 01-.881-.214 4.17 4.17 0 01-.834-.391l-.5-.366a3.431 3.431 0 01-1.139-1.952 5.016 5.016 0 01-.059-.387l-.018-.586c.01-.158.034-.315.069-.472.087-.341.213-.673.372-.988.205-.396.439-.776.7-1.137.433-.586.903-1.143 1.405-1.67.324-.342.655-.673 1.001-.993l.246-.221c.171-.114.173-.114.368-.171h.206zM82.348 6.956l.079-.006v68.484l-.171-.315a191.264 191.264 0 01-6.291-12.75 136.318 136.318 0 01-4.269-10.688 84.358 84.358 0 01-2.574-8.802c-.541-2.365-.956-4.765-1.126-7.19a35.028 35.028 0 01-.059-3.108c.016-.903.053-1.804.109-2.705.09-1.418.234-2.832.442-4.235.165-1.104.368-2.205.62-3.293.2-.865.431-1.723.696-2.567.382-1.22.84-2.412 1.373-3.576.195-.419.405-.836.624-1.245 1.322-2.449 3.116-4.704 5.466-6.214a11.422 11.422 0 015.081-1.79zm8.88.173l4.607 1.314a28.193 28.193 0 016.076 3.096 24.387 24.387 0 016.533 6.517 24.618 24.618 0 012.531 4.878 28.586 28.586 0 011.761 7.898c.061.708.096 1.418.11 2.127.016.659.012 1.321-.041 1.98a22.306 22.306 0 01-.828 4.352 34.281 34.281 0 01-1.194 3.426 49.43 49.43 0 01-1.895 4.094c-1.536 2.966-3.304 5.803-5.195 8.547a133.118 133.118 0 01-7.491 9.776 185.466 185.466 0 01-8.987 9.96c2.114-3.963 4.087-8 5.915-12.102a149.96 149.96 0 002.876-6.93 108.799 108.799 0 002.679-7.792 76.327 76.327 0 001.54-5.976c.368-1.727.657-3.472.836-5.228.15-1.464.205-2.937.169-4.406a62.154 62.154 0 00-.1-2.695c-.216-3.612-.765-7.212-1.818-10.676a31.255 31.255 0 00-1.453-3.849c-1.348-2.937-3.23-5.683-5.776-7.686l-.855-.625z"
				fill="#fff"
			/>
			<defs>
				<radialGradient
					id="_Radial1"
					cx="0"
					cy="0"
					r="1"
					gradientUnits="userSpaceOnUse"
					gradientTransform="translate(88.67 84.848) scale(120.977)"
				>
					<stop offset="0" stopColor="#ba7bf0" />
					<stop offset=".45" stopColor="#996bec" />
					<stop offset="1" stopColor="#5046e4" />
				</radialGradient>
			</defs>
		</svg>
	),
	railway: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1024"
			height="1024"
			viewBox="0 0 1024 1024"
			fill="none"
			className="w-5 h-5"
		>
			<path
				d="M4.756 438.175A520.713 520.713 0 0 0 0 489.735h777.799c-2.716-5.306-6.365-10.09-10.045-14.772-132.97-171.791-204.498-156.896-306.819-161.26-34.114-1.403-57.249-1.967-193.037-1.967-72.677 0-151.688.185-228.628.39-9.96 26.884-19.566 52.942-24.243 74.14h398.571v51.909H4.756ZM783.93 541.696H.399c.82 13.851 2.112 27.517 3.978 40.999h723.39c32.248 0 50.299-18.297 56.162-40.999ZM45.017 724.306S164.941 1018.77 511.46 1024c207.112 0 385.071-123.006 465.907-299.694H45.017Z"
				fill="#fff"
			/>
			<path
				d="M511.454 0C319.953 0 153.311 105.16 65.31 260.612c68.771-.144 202.704-.226 202.704-.226h.031v-.051c158.309 0 164.193.707 195.118 1.998l19.149.706c66.7 2.224 148.683 9.384 213.19 58.19 35.015 26.471 85.571 84.896 115.708 126.52 27.861 38.499 35.876 82.756 16.933 125.158-17.436 38.97-54.952 62.215-100.383 62.215H16.69s4.233 17.944 10.58 37.751h970.632A510.385 510.385 0 0 0 1024 512.218C1024.01 229.355 794.532 0 511.454 0Z"
				fill="#fff"
			/>
		</svg>
	),
};
export const revalidate = 10
export default async function Home() {
  let data: PlatformPercentiles = {}
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    console.log('get percentiles without fetch')
    data = await getPercentiles()
  } else {
    console.log('fetch', new Date())
    const host = process.env.VERCEL_URL?.startsWith('localhost') ? `http://${process.env.VERCEL_URL}` : `https://${process.env.VERCEL_URL}`
    const url = new URL('/api/benchmarks/percentiles', host)
    data = await fetch(url, {
      next: {
        revalidate: 5 * 60
      }
    }).then(r => r.json())
  }

	return (
		<main>
			<div className="p-6 space-y-4 my-8">
				<h2 className="font-title text-[68px] leading-[0.9] tracking-extra-tight text-white xl:text-[56px] lg:text-[44px]  sm:text-[32px] ">
					Neon regional latency
				</h2>
				<p className=" text-xl leading-snug tracking-extra-tight text-[#797d86] xl:max-w-2xl xl:text-lg lg:text-base">
					This project provides a dashboard showing the latency you can expect
					when querying a Neon database from different regions.{" "}
					<a
						className="text-white transition-colors duration-200 hover:text-primary-2 underline decoration-white/40 decoration-1 underline-offset-[5px] hover:decoration-black/60 lg:underline-offset-4"
						href="https://github.com/evanshortiss/neon-latency-tracker/"
					>
						Source code on GitHub
					</a>
				</p>
			</div>
			<div className="flex flex-col gap-12 p-6">
				{Object.keys(data).sort((a, b) => {
          const r1 = a as NeonRegion
          const r2 = b as NeonRegion
          if (neonRegionSortOrder.indexOf(r1) > neonRegionSortOrder.indexOf(r2)) {
            return 1
          } else if (neonRegionSortOrder.indexOf(r1) < neonRegionSortOrder.indexOf(r2)) {
            return -1
          } else {
            return 0
          }
        }).map((region) => (
					<div className="space-y-3" key={region}>
						<div className="flex items-center gap-2">
							{neonSvg}
							<h2 className="text-2xl">{neonRegionsToNames[region as NeonRegion]}</h2>
						</div>
						<div className="relative z-10 rounded-[14px] bg-white bg-opacity-[0.03] p-1.5 backdrop-blur-[4px] xl:rounded-xl md:p-1">
							<div
								className="absolute inset-0 z-10 rounded-[inherit] border border-white/[0.04]"
								aria-hidden="true"
							/>
							<div
								className="absolute inset-[5px] z-10 rounded-[10px] border border-white/[0.04] mix-blend-overlay"
								aria-hidden="true"
							/>
							<div className="relative z-20 w-full flex flex-col rounded-[10px] border-opacity-[0.05] bg-[#0c0d0d] xl:rounded-lg gap-5 px-4 py-4 ">
								{Object.keys(data[region]).map((platform) => (
									<div
										key={platform}
										className="relative w-full  z-10 rounded-[14px] p-4  backdrop-blur-[4px] xl:rounded-xl space-y-3"
									>
										<div className="flex space-x-2 items-center">
											{deploymentPlatforms[platform]}
											<h3 className="capitalize text-xl font-semibold">
												{platform}
											</h3>
										</div>
										<Table>
											<TableHead>
												<TableRow>
													<TableHeader>Deployed App region</TableHeader>
													<TableHeader>P50</TableHeader>
													<TableHeader>P75</TableHeader>
													<TableHeader>P95</TableHeader>
													<TableHeader>P99</TableHeader>
												</TableRow>
											</TableHead>
											<TableBody>
												{data[region][platform].map(
													(entry, index) => (
														<TableRow key={index}>
															<TableCell className="w-1/4 pr-5">
                                {/* Use mapping, or show the raw region ID if no mapping is found */}
																{platformRegionsToNames[entry.platformName as PlatformName][entry.platformRegion] || entry.platformRegion}
                                <br />
                                <small className="text-zinc-500 dark:text-zinc-400">Last updated at {new Date(entry.timestamp).toLocaleString()}</small>
															</TableCell>
															<TableCell className="w-1/5">
																{Math.trunc(Number(entry.percentiles.p50))} ms
															</TableCell>
															<TableCell className="w-1/5">
																{Math.trunc(Number(entry.percentiles.p75))} ms
															</TableCell>
															<TableCell className="w-1/5">
																{Math.trunc(Number(entry.percentiles.p95))} ms
															</TableCell>
															<TableCell className="w-1/5">
																{Math.trunc(Number(entry.percentiles.p99))} ms
															</TableCell>
														</TableRow>
													),
												)}
											</TableBody>
										</Table>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>{" "}
		</main>
	);
}
