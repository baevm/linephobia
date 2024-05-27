package globalstats

import (
	"context"
	"linephobia/backend/internal/db"
)

type GlobalStatsService struct {
	db *db.Queries
}

type Stats struct {
	Popular []*db.GetPopularRow `json:"popular"`
	Recent  []*db.GetRecentRow  `json:"recent"`
}

func NewService(repo *db.Queries) *GlobalStatsService {
	return &GlobalStatsService{
		db: repo,
	}
}

func (gss GlobalStatsService) GetAllStats(ctx context.Context) (*Stats, error) {
	popular, err := gss.db.GetPopular(ctx)

	if err != nil {
		return nil, err
	}

	recent, err := gss.db.GetRecent(ctx)

	if err != nil {
		return nil, err
	}

	return &Stats{
		Popular: popular,
		Recent:  recent,
	}, nil
}

func (gss GlobalStatsService) UpdatePopular(ctx context.Context, id int64) error {
	return gss.db.UpdatePopular(ctx, id)
}
