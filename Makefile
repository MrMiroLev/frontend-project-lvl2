install: install-deps

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx --experimental-vm-modules jest

test-coverage:
	npx jest --coverage