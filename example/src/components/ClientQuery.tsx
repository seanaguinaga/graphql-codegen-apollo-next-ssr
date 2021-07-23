import Link from "next/link";
import { useRouter } from "next/router";
import { useGetContinents } from "../generated/page";

const ClientQuery = () => {
  let { data, loading, error } = useGetContinents();

  let router = useRouter();

  return (
    <ion-card>
      <ion-card-header>
        <ion-card-title>Client-Side Query</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        {error && <ion-item color="danger">{error.message}</ion-item>}
        {loading && (
          <>
            <ion-item>
              <ion-label>
                <ion-skeleton-text
                  animated
                  style={{ width: "60%" }}
                ></ion-skeleton-text>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <ion-skeleton-text
                  animated
                  style={{ width: "88%" }}
                ></ion-skeleton-text>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                <ion-skeleton-text
                  animated
                  style={{ width: "50%" }}
                ></ion-skeleton-text>
              </ion-label>
            </ion-item>
          </>
        )}
        {data?.continents.map((continent, index) => (
          <Link href={`/${continent.code}`} passHref key={index} shallow>
            <ion-item
              color={router.query.continent === continent.code ? "primary" : ""}
            >
              {continent.name}
            </ion-item>
          </Link>
        ))}
      </ion-card-content>
    </ion-card>
  );
};

export default ClientQuery;
