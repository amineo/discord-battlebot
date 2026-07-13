FROM node:16.13.2-bullseye

# Build toolchain for qstat (GNU Autotools C project)
RUN apt-get update && apt-get install -y --no-install-recommends \
      build-essential autoconf automake git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Compile qstat fresh for Linux at the pinned submodule commit.
# Produces the binary at /app/qstat/qstat (what modules/Query.js execs).
RUN git clone https://github.com/amineo/qstat.git qstat \
    && cd qstat \
    && git checkout d4a529449863baae124130bca45a6e936ae57ceb \
    && chmod +x autogen.sh \
    && ./autogen.sh \
    && ./configure CFLAGS="-g -O2 -fcommon" \
    && make

# Install JS deps WITHOUT running the root package's qstat build scripts
# (preinstall/install). --ignore-scripts is safe: no dependency needs a
# native/postinstall step. Deps and lockfile are unchanged.
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --production=false

# App source. qstat/ and node_modules are excluded via .dockerignore so this
# COPY does not clobber the freshly compiled binary or reinstalled modules.
COPY . .

ENV PORT=8080
EXPOSE 8080
CMD ["npm", "start"]
