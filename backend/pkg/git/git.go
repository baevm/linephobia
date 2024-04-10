package git

import (
	"net/url"
	"strings"

	goGit "github.com/go-git/go-git/v5"
)

type RepoParams struct {
	Site  string
	Owner string
	Name  string
}

func DecodeURL(gitUrl string) (*RepoParams, error) {
	repoUrl, err := url.Parse(gitUrl)

	if err != nil {
		return nil, err
	}

	// /facebook/react
	repoFull := repoUrl.Path

	// [facebook, react]
	arr := strings.Split(repoFull[1:], "/")

	return &RepoParams{
		Site:  repoUrl.Host,
		Owner: arr[0],
		Name:  arr[1],
	}, nil
}

func Clone(path string, repoUrl string) (*goGit.Repository, error) {
	return goGit.PlainClone(path, false, &goGit.CloneOptions{
		URL: repoUrl,
	})
}
