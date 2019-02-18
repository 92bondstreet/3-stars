SHELL := /bin/bash

.PHONY: dist sandbox

alias: ## alias to 3-stars.now.sh
	now alias $(filter-out $@,$(MAKECMDGOALS)) 3-stars
	now alias $(filter-out $@,$(MAKECMDGOALS)) 3stars
	now alias $(filter-out $@,$(MAKECMDGOALS)) three-stars
	now alias $(filter-out $@,$(MAKECMDGOALS)) threestars

deploy: ## deploy with zeit
	yarn run build
	now

parse: ## parse and index all posts with algolia
	node bin/index.js $(filter-out $@,$(MAKECMDGOALS))

sandbox: ## sandbox for client-side dev purpose
	yarn start

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
