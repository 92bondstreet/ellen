SHELL := /bin/bash

.PHONY: dist

alias: ## alias to ellen.now.sh
	now alias $(filter-out $@,$(MAKECMDGOALS)) ellen

dist: ## build api
	ncc build api/index.js -o dist-api

deploy: ## deploy
	make dist
	now --public -n ellen

login: ## login with now
	now login

parse: ## parse and save all issues in db
	node bin/index.js

sandbox: ## sandbox for client-side dev purpose
	yarn start

sandbox-api: ## sandbox for api dev purpose
	./node_modules/.bin/nodemon api/index.js

start: ## start the graphql server
	node api/index.js

help: ## This help dialog.
	@IFS=$$'\n' ; \
	intro_lines=(`fgrep -h "###" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/###//'`); \
	for line in $${intro_lines[@]}; do \
		printf "%s\n" $$line; \
	done; \
	help_lines=(`fgrep -h -e "##" $(MAKEFILE_LIST) | fgrep -v "###" | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##/:/'`); \
	for help_line in $${help_lines[@]}; do \
		IFS=$$':' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf '\033[36m'; \
		printf "%-30s %s" $$help_command ; \
		printf '\033[0m'; \
		printf "%s\n" $$help_info; \
	done

.DEFAULT_GOAL := help
