package config

import (
	"log"
	"os"

	"github.com/spf13/viper"
)

type Config struct {
	DB_DSN string `mapstructure:"DB_DSN"`

	API_HOST string `mapstructure:"API_HOST"`
	API_PORT string `mapstructure:"API_PORT"`

	REDIS_HOST string `mapstructure:"REDIS_HOST"`
	REDIS_PORT string `mapstructure:"REDIS_PORT"`
}

var Data Config

func Load() error {
	dirname, err := os.Getwd()

	if err != nil {
		panic(err)
	}

	viper.SetConfigFile(dirname + "/config/.env")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading env file, %s", err)
	}

	viper.AutomaticEnv()

	err = viper.Unmarshal(&Data)
	if err != nil {
		log.Fatalf("unable to unmarshall into struct, %v", err)
	}

	return nil
}
