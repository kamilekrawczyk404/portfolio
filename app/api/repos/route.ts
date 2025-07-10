import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiInternalSecret = process.env.INTERNAL_API_SECRET;
  const providedSecret = request.headers.get("X-Internal-Api-Secret");

  if (!apiInternalSecret || providedSecret !== apiInternalSecret) {
    return NextResponse.json(
      {
        error: "Unauthorized: Invalid or missing internal API key.",
        status: 403,
      },
      { status: 403 },
    );
  }

  const accessToken = process.env.GITHUB_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Cannot get github access token", status: 500 },
      { status: 500 },
    );
  }

  try {
    const options = {
      headers: {
        "User-Agent": "Next.js-App",
        Authorization: `token ${accessToken}`,
      },
    };

    const response = await fetch(
      `https://api.github.com/user/repos?type=all`,
      options,
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub API Error:", errorData);

      return NextResponse.json(
        { error: `Failed to fetch repositories: ${response.statusText}` },
        { status: response.status },
      );
    }

    const repos = await response.json();

    const reposWithLanguages = [];

    // console.log("KURWAAAAA", repos);

    // for (const repo of repos.repositories) {
    //   const languagesResponse = await fetch(
    //     `https://api.github.com/repos/${repo.full_name}/languages`,
    //     options,
    //   );
    //
    //   if (!languagesResponse.ok) {
    //     const errorData = await languagesResponse.json();
    //     console.error(`Error while getting project languages: ${errorData}`);
    //
    //     return NextResponse.json(
    //       {
    //         error: `Failed to fetch project languages: ${languagesResponse.statusText}`,
    //       },
    //       { status: response.status },
    //     );
    //   }
    //
    //   const languages = await languagesResponse.json();
    //
    //   reposWithLanguages.push({
    //     ...repo,
    //     languages,
    //   });
    // }

    return NextResponse.json(repos, { status: 200 });
  } catch (error) {
    console.error(`Error while getting repos: ${error}`);
    return NextResponse.json(error, { status: 500 });
  }
}
