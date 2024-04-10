package models

import "github.com/boyter/scc/v3/processor"

type Language struct {
	Name       string               `json:"name"`
	Bytes      int64                `json:"bytes"`
	Lines      int64                `json:"lines"`
	Code       int64                `json:"code"`
	Comment    int64                `json:"comment"`
	Blank      int64                `json:"blank"`
	Complexity int64                `json:"complexity"`
	Count      int64                `json:"count"`
	Files      []*processor.FileJob `json:"files"`
}

type TotalSummary struct {
	Lines   int64 `json:"lines"`
	Blank   int64 `json:"blank"`
	Comment int64 `json:"comment"`
	Code    int64 `json:"code"`
	Files   int64 `json:"files"`
}

type LanguageSummary struct {
	Languages []Language   `json:"languages"`
	Total     TotalSummary `json:"total"`
}
