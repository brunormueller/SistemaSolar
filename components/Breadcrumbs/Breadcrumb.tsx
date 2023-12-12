import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import img from "../../pages/app/favicon.ico";
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const router = useRouter();
  const rotina = router.pathname.replace("/app/pages/", "");

  return (
    <>
      <Head>
        <title>Linksun | {pageName}</title>
        <link rel="shortcut icon" href="/pages/app/favicon.ico" />
      </Head>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-title-md2 font-semibold text-black dark:text-white">
          <h2>{pageName}</h2>
          <h5 className="text-sm font-semibold mt-2 text-body dark:text-white">
            {rotina}
          </h5>
        </div>
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" href="/dashboard">
                {rotina != "/dashboard" ? "Dashboard /" : ""}
              </Link>
            </li>
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      </div>
    </>
  );
};

export default Breadcrumb;
