import { GitHubCalendar } from "react-github-calendar";

const GITHUB_USERNAME = "Arijit2175";

const githubTheme = {
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

const GitHubActivity = () => {
  return (
    <section id="github-activity" className="c-space mt-20 md:mt-24">
      <h2 className="text-heading">GitHub Contributions</h2>

      <div className="mt-8 border rounded-2xl border-white/10 bg-midnight/60 p-4 sm:p-6">
        <p className="mb-4 text-sm text-neutral-400 md:text-base">
          My recent commit activity from GitHub.
        </p>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open GitHub profile"
          className="block w-full overflow-x-auto"
        >
          <div className="min-w-[720px] rounded-lg">
            <GitHubCalendar
              username={GITHUB_USERNAME}
              colorScheme="dark"
              theme={githubTheme}
              fontSize={14}
              blockSize={14}
              blockMargin={4}
              labels={{
                totalCount: "{{count}} contributions in the last year",
              }}
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default GitHubActivity;