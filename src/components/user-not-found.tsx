import Link from "next/link";

type UserNotFoundProps = {
  userId: string | null;
};

const UserNotFound = ({ userId }: UserNotFoundProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h1 className="text-xl font-semibold tracking-tight">
            User not found
          </h1>
          <p className="text-sm text-muted-foreground">
            We couldn&apos;t verify your access. Please confirm your user ID.
          </p>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="rounded-md border border-dashed border-border bg-muted/30 px-4 py-3 text-sm">
            {userId ? (
              <>
                <span className="font-medium">Provided ID:</span>{" "}
                <span className="text-muted-foreground break-all">
                  {userId}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">
                No user ID was supplied in the request.
              </span>
            )}
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Ensure the link contains a valid <code>userId</code> query.
            </li>
            <li>Contact support if you believe this is an error.</li>
            <li>Refresh the page after fixing the user ID.</li>
          </ul>
        </div>
        <div className="border-t border-border bg-muted/40 px-6 py-4 flex justify-end">
          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-md border border-input bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserNotFound;
